import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto): Promise<void>{
    return this.authService.signUp(authCredentialsDto);
  }

  @Put('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}>{
    return this.authService.signIn(authCredentialsDto);
  }
}
