import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = Router();

const compareSchema = z.object({
  ids: z.string().transform((val) => val.split(',')).pipe(
    z.array(z.string().min(1)).min(2).max(3)
  ),
});

// GET /api/compare?ids=id1,id2,id3
router.get('/', async (req: Request, res: Response) => {
  try {
    const parsed = compareSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Provide 2–3 college IDs as comma-separated `ids` query param',
        details: parsed.error.flatten(),
      });
    }

    const { ids } = parsed.data;

    const colleges = await prisma.college.findMany({
      where: { id: { in: ids } },
      include: {
        courses: true,
        placements: { orderBy: { year: 'desc' }, take: 1 },
        _count: { select: { reviews: true } },
      },
    });

    if (colleges.length < 2) {
      return res.status(404).json({ error: 'Could not find enough colleges to compare' });
    }

    // Build comparison matrix
    const comparisonMatrix = {
      colleges,
      metrics: [
        {
          key: 'rating',
          label: 'Overall Rating',
          values: colleges.map((c) => ({ collegeId: c.id, value: c.rating, unit: '/5' })),
        },
        {
          key: 'totalFees',
          label: 'Total Fees',
          values: colleges.map((c) => ({ collegeId: c.id, value: c.totalFees, unit: '₹' })),
        },
        {
          key: 'nirfRank',
          label: 'NIRF Rank',
          values: colleges.map((c) => ({ collegeId: c.id, value: c.nirfRank, unit: '#', lowerIsBetter: true })),
        },
        {
          key: 'naacGrade',
          label: 'NAAC Grade',
          values: colleges.map((c) => ({ collegeId: c.id, value: c.naacGrade })),
        },
        {
          key: 'type',
          label: 'Institution Type',
          values: colleges.map((c) => ({ collegeId: c.id, value: c.type })),
        },
        {
          key: 'established',
          label: 'Established',
          values: colleges.map((c) => ({ collegeId: c.id, value: c.established })),
        },
        {
          key: 'totalSeats',
          label: 'Total Seats',
          values: colleges.map((c) => ({ collegeId: c.id, value: c.totalSeats })),
        },
        {
          key: 'avgPackage',
          label: 'Avg Placement Package',
          values: colleges.map((c) => ({
            collegeId: c.id,
            value: c.placements[0]?.avgPackage ?? null,
            unit: '₹',
          })),
        },
        {
          key: 'placementRate',
          label: 'Placement Rate',
          values: colleges.map((c) => ({
            collegeId: c.id,
            value: c.placements[0]?.placementRate ?? null,
            unit: '%',
          })),
        },
        {
          key: 'highestPackage',
          label: 'Highest Package',
          values: colleges.map((c) => ({
            collegeId: c.id,
            value: c.placements[0]?.highestPackage ?? null,
            unit: '₹',
          })),
        },
      ],
    };

    return res.json(comparisonMatrix);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to compare colleges' });
  }
});

export default router;
