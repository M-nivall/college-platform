import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = Router();

const querySchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  course: z.string().optional(),
  minFees: z.coerce.number().optional(),
  maxFees: z.coerce.number().optional(),
  sortBy: z.enum(['rating', 'totalFees', 'nirfRank', 'name']).optional().default('rating'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(50).optional().default(12),
});

// GET /api/colleges - list with search, filter, pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid query parameters', details: parsed.error.flatten() });
    }

    const { search, location, type, course, minFees, maxFees, sortBy, sortOrder, page, limit } = parsed.data;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.OR = [
        ...(where.OR || []),
        { city: { contains: location, mode: 'insensitive' } },
        { state: { contains: location, mode: 'insensitive' } },
      ];
    }

    if (type) {
      where.type = { equals: type, mode: 'insensitive' };
    }

    if (minFees !== undefined || maxFees !== undefined) {
      where.totalFees = {};
      if (minFees !== undefined) where.totalFees.gte = minFees;
      if (maxFees !== undefined) where.totalFees.lte = maxFees;
    }

    if (course) {
      where.courses = {
        some: {
          name: { contains: course, mode: 'insensitive' },
        },
      };
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc' },
        include: {
          courses: { take: 3 },
          placements: { orderBy: { year: 'desc' }, take: 1 },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.college.count({ where }),
    ]);

    return res.json({
      data: colleges,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// GET /api/colleges/filters - get unique filter values
router.get('/filters', async (_req: Request, res: Response) => {
  try {
    const [states, types, courses] = await Promise.all([
      prisma.college.findMany({ select: { state: true }, distinct: ['state'], orderBy: { state: 'asc' } }),
      prisma.college.findMany({ select: { type: true }, distinct: ['type'] }),
      prisma.course.findMany({ select: { name: true }, distinct: ['name'], orderBy: { name: 'asc' } }),
    ]);

    return res.json({
      states: states.map((s) => s.state),
      types: types.map((t) => t.type),
      courses: courses.map((c) => c.name),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch filters' });
  }
});

// GET /api/colleges/:id - detail page
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
        placements: { orderBy: { year: 'desc' } },
        reviews: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    return res.json(college);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch college details' });
  }
});

export default router;
