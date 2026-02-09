import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
    try {
        const { dishName } = await request.json();

        if (!dishName) {
            return json({ error: 'Dish name is required' }, { status: 400 });
        }

        const apiKey = env.GOOGLE_API_KEY;

        if (!apiKey) {
            console.error('GOOGLE_API_KEY is missing in environment variables');
            return json({
                error: 'Service configuration error',
                details: 'API key is not configured'
            }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const prompt = `料理名 "${dishName}" のレシピを生成してください。
    以下のJSON形式で出力してください：
    {
      "name": "料理名",
      "ingredients": ["材料1", "材料2"],
      "steps": ["手順1", "手順2"],
      "tips": "コツやポイント"
    }
    回答は純粋なJSONのみとし、日本語で出力してください。Markdownの装飾は含めないでください。`;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Remove markdown code blocks if present
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

            const recipe = JSON.parse(cleanText);
            return json(recipe);
        } catch (apiError: any) {
            console.error('Gemini API Error:', apiError);
            return json({
                error: 'Failed to generate recipe from AI',
                details: apiError.message
            }, { status: 500 });
        }

    } catch (error: any) {
        console.error('Server Error:', error);
        return json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}
