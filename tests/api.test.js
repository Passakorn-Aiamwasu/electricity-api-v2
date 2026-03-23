const request = require('supertest');
const app = require('../index');

describe('Electricity API Comprehensive Test Suite', () => {

    // API 1: Total electricity usages for each year
    describe('GET /api/usage/total-by-year', () => {
        it('valid: should return total usage for all years', async () => {
            const res = await request(app).get('/api/usage/total-by-year');
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
        });

        it('invalid: wrong endpoint should return 404', async () => {
            const res = await request(app).get('/api/usage/total-by-yea');
            expect(res.statusCode).toBe(404);
        });
    });

    // API 2: Total electricity users for each year
    describe('GET /api/users/total-by-year', () => {
        it('valid: should return total users for all years', async () => {
            const res = await request(app).get('/api/users/total-by-year');
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
        });

        it('invalid: wrong endpoint should return 404', async () => {
            const res = await request(app).get('/api/users/total-by-yea');
            expect(res.statusCode).toBe(404);
        });
    });

    // API 3: Usage of specific province by specific year
    describe('GET /api/usage/:province/:year', () => {
        it('valid: should return usage data for valid province and year', async () => {
            const res = await request(app).get('/api/usage/Bangkok/2566');
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
        });

        it('invalid: should return not found message', async () => {
            const res = await request(app).get('/api/usage/InvalidProvince/9999');
            expect(res.body).toHaveProperty('message');
        });
    });

    // API 4: Users of specific province by specific year
    describe('GET /api/users/:province/:year', () => {
        it('valid: should return users data for valid province and year', async () => {
            const res = await request(app).get('/api/users/Bangkok/2566');
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
        });

        it('invalid: should return not found message', async () => {
            const res = await request(app).get('/api/users/InvalidProvince/9999');
            expect(res.body).toHaveProperty('message');
        });
    });

    // API 5: Usage history by specific province
    describe('GET /api/usage/history/:province', () => {
        it('valid: should return usage history array', async () => {
            const res = await request(app).get('/api/usage/history/Bangkok');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('invalid: should return empty array for unknown province', async () => {
            const res = await request(app).get('/api/usage/history/UnknownPlace');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // API 6: User history by specific province
    describe('GET /api/users/history/:province', () => {
        it('valid: should return users history array', async () => {
            const res = await request(app).get('/api/users/history/Bangkok');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('invalid: should return empty array for unknown province', async () => {
            const res = await request(app).get('/api/users/history/UnknownPlace');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Error Handling Test
    describe('General Error Handling', () => {
        it('should return 404 for unknown route', async () => {
            const res = await request(app).get('/api/unknown/route');
            expect(res.statusCode).toBe(404);
        });
    });

});