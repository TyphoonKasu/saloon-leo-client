import z from "zod";


const userAuthenticationRequestSchema = z.object(
    {
        email : z.email(
                {
                    error : "Invalid email address"
                }
        ),
    
        password : z.string(
                {
                    error : "Invalid password"
                }
            ).min(1,
                {
                    error : "Please Provide a password"
                })
    }
)

export default userAuthenticationRequestSchema;