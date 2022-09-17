import {IsNotEmpty} from "class-validator";


export class SongUploadRequestDto{

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    img: string;

    @IsNotEmpty()
    artist: string;

    @IsNotEmpty()
    audio: string;

}
