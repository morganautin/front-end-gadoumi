import { http, HttpResponse } from 'msw';

// Données simulées pour le profil utilisateur
const mockUserProfile = {
  id: 'user-123',
  username: 'demo',
  email: 'demo@example.com',
  fullName: 'John Doe',
  preferences: {
    newsletter: true,
    defaultMinRating: 4,
  },
};

// Données simulées pour la liste des commandes
const mockUserOrders = [
  {
    id: 'order-abc',
    date: '2024-10-26T10:00:00Z',
    total: 125.5,
    status: 'livrée',
  },
  {
    id: 'order-def',
    date: '2024-11-15T14:30:00Z',
    total: 89.99,
    status: 'expédiée',
  },
  {
    id: 'order-ghi',
    date: '2024-11-25T09:00:00Z',
    total: 210.0,
    status: 'en cours',
  },
];

export const userHandlers = [
  // Handler pour GET /api/me/
  http.get('/api/me/', () => {
    // On retourne les données du profil simulé en JSON
    return HttpResponse.json(mockUserProfile);
  }),

  // Handler pour GET /api/me/orders/
  http.get('/api/me/orders/', () => {
    // On retourne la liste des commandes simulées en JSON
    return HttpResponse.json(mockUserOrders);
  }),
];