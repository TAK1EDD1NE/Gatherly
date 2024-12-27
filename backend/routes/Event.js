import express from 'express';
import { auth_token } from '../middleware/auth.js'
import ROLES from '../lib/roles.js'
import {//addGuest,
        // addProgramItem,
        createEvent,
        deleteEvent,
        // deleteProgramItem,
        getEventById,
        // removeGuest 
    } from '../controllers/Event.js';

const eventRoutes = express.Router()

eventRoutes.post('/create' , auth_token(ROLES.user), createEvent)
eventRoutes.delete('/delete/:id' , auth_token(ROLES.user), deleteEvent)
eventRoutes.get('/get-by-id/:id' , auth_token(ROLES.all), getEventById)


// NO NEED FOR THESE ROUTES 
// eventRoutes.post('/guest/add' , auth_token(ROLES.admin), addGuest)
// eventRoutes.delete('/guest/remove/:id' , auth_token(ROLES.admin), removeGuest)
// eventRoutes.post('/program/add' , auth_token(ROLES.admin), addProgramItem)
// eventRoutes.delete('/program/remove/:id' , auth_token(ROLES.admin), deleteProgramItem)


export default eventRoutes