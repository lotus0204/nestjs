import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/,{
    message: 'password only accepts eng and num'
  })
  password: string;
}
//여기서 정한 벨리데이터를 파이프로 전달한다