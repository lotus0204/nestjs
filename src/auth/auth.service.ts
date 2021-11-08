import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }
  
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    return await this.userRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}>{
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload); //이 부분에서 secret값을 어떻게 합쳐서 넣는지 잘 모르겠어

      return { accessToken };
    }
    else throw new UnauthorizedException('logIn failed');
  }
}
