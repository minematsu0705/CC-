import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;

async function run() {
    console.log('Listing models...');
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('Models Status:', response.status);
        if (data.models) {
            console.log('Available Models:', data.models.map(m => m.name).join(', '));
        } else {
            console.log('No models found or error:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Error listing models:', error.message);
    }
}

run();
