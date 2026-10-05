exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello! Nexus AI is online and the serverless function is working." })
    };
};