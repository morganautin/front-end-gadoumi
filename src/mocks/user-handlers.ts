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

const initialOrders = [
  {
    id: 'order-abc',
    date: '2024-10-26T10:00:00Z',
    total: 125.5,
    status: 'livrée' as const,
  },
  {
    id: 'order-def',
    date: '2024-11-15T14:30:00Z',
    total: 89.99,
    status: 'expédiée' as const,
  },
  {
    id: 'order-ghi',
    date: '2024-11-25T09:00:00Z',
    total: 210.0,
    status: 'en cours' as const,
  },
];

// --- Fausse base de données avec sessionStorage ---
const getOrdersFromStorage = () => {
  const storedOrders = sessionStorage.getItem('mockUserOrders');
  if (storedOrders) {
    return JSON.parse(storedOrders);
  }
  // Si rien n'est stocké, on initialise avec les données de base
  sessionStorage.setItem('mockUserOrders', JSON.stringify(initialOrders));
  return initialOrders;
};
const saveOrdersToStorage = (orders: any) => sessionStorage.setItem('mockUserOrders', JSON.stringify(orders));

export const userHandlers = [
  // Handler pour GET /api/me/
  http.get('/api/me/', () => {
    // On retourne les données du profil simulé en JSON
    return HttpResponse.json(mockUserProfile);
  }),

  // Handler pour GET /api/me/orders/
  http.get('/api/me/orders/', () => {
    const orders = getOrdersFromStorage();
    // On retourne la liste des commandes simulées en JSON
    return HttpResponse.json(orders);
  }),

  // Handler pour PATCH /api/me/
  http.patch('/api/me/', async ({ request }) => {
    const updates = (await request.json()) as Partial<typeof mockUserProfile>;

    // Fusion "profonde" pour les préférences pour ne pas écraser les autres valeurs
    const newPreferences = {
      ...mockUserProfile.preferences,
      ...updates.preferences,
    };

    // On fusionne les mises à jour avec l'utilisateur existant
    Object.assign(mockUserProfile, { ...updates, preferences: newPreferences });

    return HttpResponse.json(mockUserProfile, { status: 200 });
  }),

  // Handler pour créer une nouvelle commande
  // C'est ce que votre processus de checkout devrait appeler
  http.post('/api/orders/', async ({ request }) => {
    // On lit les données envoyées par le front-end (total, adresse, etc.)
    const orderData = (await request.json()) as { total: number, shippingAddress: any };

    const newOrder = {
      id: `order-${Math.random().toString(36).substring(7)}`, // Génère un ID aléatoire
      date: new Date().toISOString(), // On utilise 'date'
      total: orderData.total, // On utilise le VRAI total du panier
      status: 'en cours' as const,
      // On pourrait aussi sauvegarder orderData.shippingAddress si nécessaire
    };
    // On récupère les commandes actuelles, on ajoute la nouvelle et on sauvegarde
    const currentOrders = getOrdersFromStorage();
    const updatedOrders = [newOrder, ...currentOrders];
    saveOrdersToStorage(updatedOrders);
    return HttpResponse.json(newOrder, { status: 201 });
  }),

  // Handler pour GET /api/products/:id
  // NOTE : Ce handler devrait idéalement être dans un fichier `products-handlers.ts`
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    // Pour la démo, on renvoie un produit factice.
    // Idéalement, il faudrait chercher dans une liste de produits mockés.
    const mockProduct = { id, name: `Détail du Produit ${id}`, price: 99.99, description: 'Une description très détaillée de ce produit fantastique qui répondra à tous vos besoins.', avg_rating: 4.5 };
    return HttpResponse.json(mockProduct);
  }),
];