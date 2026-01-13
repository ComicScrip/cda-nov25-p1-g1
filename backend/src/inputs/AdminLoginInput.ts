import { Field, InputType } from "type-graphql";
import { IsStrongPassword, Length } from "class-validator";

@InputType()
export class AdminLoginInput {
  @Field()
  @Length(3, 50, { message: "Identifiant doit être entre 3 et 50 caractères." })
  username: string;

  @Field()
  @IsStrongPassword(
    {},
    { message: "Le mot de passe doit contenir au moins 8 caractères, dont 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial." }
  )
  password: string;
}
