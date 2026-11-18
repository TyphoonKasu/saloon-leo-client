import z from "zod";

// const userRegistrationRequestSchema = z.object(
//     {
//         email: z.email().catch("Invalid email address"),
//         firstName: z.string().min(1).max(20).catch("Invalid first name"),
//         lastName: z.string().min(1).max(20).catch("Invalid last name"),
//         password: z.string().min(6).max(25).catch("Invalid password")
//     }
// )

const userRegistrationRequestSchema = z.object(
    {
        email : z.email(
                {
                    error : "Invalid email address"
                }
        ),
            firstName : z.string(
                    {
                        error : "Invalid first name"
                    }
                ).min(1, 
                    { 
                        error : "First name must be at least 1 character long" 
                    }
                ).max(20,
                    {
                        error : "First name must be at most 20 characters long"
                    }
        ),
            lastName : z.string(
                    {
                        error : "Invalid last name"
                    }
                ).min(1,
                    {
                        error : "Last name must be at least 1 character long"
                    }
                ).max(20,
                    {
                        error : "Last name must be at most 20 characters long"
                    }
        ),
            password : z.string(
                    {
                        error : "Invalid password"
                    }
                ).min(6,
                    {
                        error : "Password must be at least 6 characters long"
                    }
                ).max(25,
                    {
                        error : "Password must be at most 25 characters long"
                    }
        )
    }
)

export default userRegistrationRequestSchema;