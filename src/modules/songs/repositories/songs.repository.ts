import { EntityRepository, Repository } from "typeorm"
import { Songs } from "../entities/songs.entity";

@EntityRepository(Songs)
export class SongsRepository extends Repository<Songs>{}