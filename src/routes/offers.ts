import { FastifyInstance } from 'fastify';
import { OffersController } from '../controllers/OffersController';

export default async function (fastify: FastifyInstance) {
  // Get weekend offers
  fastify.get('/offers/weekend', async (request, reply) => {
    const offers = await OffersController.getWeekendOffers();
    return offers;
  });

  // Get birthday offers
  fastify.get('/offers/birthday/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const birthdayOffer = await OffersController.getBirthdayOffer(userId);
    return birthdayOffer;
  });

  // Create new offer
  fastify.post('/offers', async (request, reply) => {
    const offer = await OffersController.createOffer(request.body);
    return offer;
  });
} 