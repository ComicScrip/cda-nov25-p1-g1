import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Check,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Check(`"difficulty" IN ('Facile','Moyen','Difficile')`)
@Entity({ name: "Word" })
export class Word extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id_word" })
    idWord: number;

    @Field()
    @Column({ length: 50 })
    label: string;

    @Field()
    @Column({ length: 50 })
    difficulty: string;

    @Field()
    @Column({ length: 50 })
    category: string;
}
