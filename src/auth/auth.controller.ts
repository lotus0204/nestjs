import { Body, Controller, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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

  //이부분 전반적인 흐름이 잘 이해가 안된다.
  @Post('/test')
  @UseGuards(AuthGuard())//이걸 컨트롤러 단으로 옮기면 모든 크 컨트롤러전체에서 영향을 받는다
  test(@GetUser() user: User) {
    console.log('user', user);
  }
}
