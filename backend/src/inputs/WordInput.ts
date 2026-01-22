import { InputType, Field } from "type-graphql";
import { IsIn, Length} from "class-validator";

@InputType()
export class WordInput {
  @Field()
  @Length(2, 50)
  label: string;

  @Field()
  @Length(2, 100)
  indice: string;

  @Field()
  @IsIn(["Facile", "Moyen", "Difficile"])
  difficulty: "Facile" | "Moyen" | "Difficile";

  @Field()
  @Length(2, 50)
  category: string;
}
