import * as jwt from 'jsonwebtoken';
interface TokenPayload {
    userId: string;
    email:string; 
    role:string;
}

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }
  

  export class AuthService {
    private generateToken(payload:TokenPayload):AuthTokens {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});

        const refreshToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});

        return {accessToken,refreshToken};
    }

}