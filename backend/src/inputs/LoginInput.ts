import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @Length(3, 50, { message: "Identifiant doit être entre 3 et 50 caractères." })
  username: string;

  @Field()
  @Length(8, 128, { message: "Mot de passe invalide." })
  password: string;
}
