import OpenAI from "openai";



const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
})




// Creating a function to write a logics :




export async function POST(request) {

   try {
    const {message} = await request.json();

    const completetion = await openai.chat.completions.create({
        model:"gpt-3.5-turbo-0301",
        messages:[{role:"user",content:message}]
    })

    return Response.json({
        response:completetion.choices[0].message.content[0]
    })
    
   } catch (error) {
    return Response.json({
        error:"Failed to process the request."
    },{status:500})
   }
    
}