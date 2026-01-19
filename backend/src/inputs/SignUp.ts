import { Field, InputType } from "type-graphql";
import { IsStrongPassword, Length } from "class-validator";

@InputType()
export class SignUp {
    @Field()
    @Length(3, 50, { message: "Identifiant doit être entre 3 et 50 caractères." })
    username: string;

    @Field()
    @IsStrongPassword(
        {},
        {
            message:
                "8 charactères avec 1 majuscule ,1 minuscule,1 chiffre,1 symbole minimum.",
        }
    )
    password: string;
}