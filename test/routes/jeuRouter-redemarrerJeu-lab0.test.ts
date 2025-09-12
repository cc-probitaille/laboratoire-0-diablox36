import 'jest-extended';
import request from 'supertest';
import app from '../../src/app';

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
    await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: 'Joueur1' });
    
    await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: 'Joueur2' });
  });

  it('devrait redémarrer le jeu avec succès (scénario principal)', async () => {
    const response = await request(app)
      .get('/api/v1/jeu/redemarrerJeu');
    
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  it('devrait valider la postcondition - il n\'y a plus de joueurs', async () => {
    await request(app)
      .get('/api/v1/jeu/redemarrerJeu');
    
    const response = await request(app)
      .get('/api/v1/jeu/getJoueurs');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});