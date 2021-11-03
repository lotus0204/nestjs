//dto는 일일히 다 써서 하기 번거로우니깐 많은 것을 하나의 객체같은 것에 넣어서 간편하게 사용

import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}