import {Message} from '~/server/models/message.model';
import mongoose from 'mongoose';
export default defineEventHandler(async (event) =>{
    const name = getRouterParam(event, 'name')
    const sender = getQuery(event).sender
    let messages = Message.find({reciever: name, sender: sender}).exec()
    return messages
})