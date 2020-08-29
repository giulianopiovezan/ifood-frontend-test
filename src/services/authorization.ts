import axios from 'axios';
import authConfig from 'config/auth';

interface AuthorizationResponse {
  access_token: string;
}

export default async function authorize(): Promise<string> {
  const response = await axios.post<AuthorizationResponse>(
    authConfig.authorizationServer,
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: authConfig.username,
        password: authConfig.password,
      },
    },
  );

  return response.data.access_token;
}
