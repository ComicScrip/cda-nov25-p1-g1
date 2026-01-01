import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Word } from "./Word";

@ObjectType()
@Entity({ name: "Synonyme" })
export class Synonyme extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id_syn" })
    idSyn: number;

    @Field(() => [Word])
    @ManyToMany(() => Word)
    @JoinTable({
        name: "SynWord",
        joinColumn: { name: "id_syn", referencedColumnName: "idSyn" },
        inverseJoinColumn: { name: "id_word", referencedColumnName: "idWord" },
    })
    words: Word[];
}

@InputType()
export class CreateSyn {
    @Field(() => [Int])
    wordIds: number[];
}
