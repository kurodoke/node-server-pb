import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { Player } from "../../model/player";

export class BASE_CONFIG_PAK extends Packet {
    public player: Player;
    private _err: number;

    constructor(opcode: number, connection: Connection, error: number) {
        super("write", opcode);
        this.player = connection.player;
        this._err = error;
    }

    write() {
        this.writeD(this._err);
        if (this._err == 0) {
            this.writeC(this.player.name == "" ? 1 : 0);
            this.writeH(this.player.playerConfig.blood);
            this.writeC(this.player.playerConfig.crosshair);
            this.writeC(this.player.playerConfig.hand);
            this.writeD(this.player.playerConfig.configuration);
            this.writeD(this.player.playerConfig.audio_enabled);
            this.writeH(this.player.playerConfig.unk1);
            this.writeC(this.player.playerConfig.audio1);
            this.writeC(this.player.playerConfig.audio2);
            this.writeH(this.player.playerConfig.vision);
            this.writeC(this.player.playerConfig.sensitivity);
            this.writeC(this.player.playerConfig.inverted_mouse);
            this.writeH(this.player.playerConfig.unk2);
            this.writeC(this.player.playerConfig.invite_message);
            this.writeC(this.player.playerConfig.whisper_chat);
            this.writeC(this.player.playerConfig.macro);
            this.writeH(this.player.playerConfig.unk3);
            this.writeC(this.player.playerConfig.unk4);
            this.writeC(this.player.playerConfig.keyboard.k_value5);
            this.writeC(this.player.playerConfig.keyboard.k_value1);
            this.writeC(this.player.playerConfig.keyboard.k_value2);
            this.writeC(this.player.playerConfig.keyboard.k_value3);
            this.writeC(this.player.playerConfig.keyboard.k_value4);
            this.writeC(this.player.playerConfig.mouse.k_type[1]);
            this.writeD(this.player.playerConfig.keyboard.k_left);
            this.writeC(this.player.playerConfig.mouse.k_type[2]);
            this.writeD(this.player.playerConfig.keyboard.k_right);
            this.writeC(this.player.playerConfig.mouse.k_type[3]);
            this.writeD(this.player.playerConfig.keyboard.k_forward);
            this.writeC(this.player.playerConfig.mouse.k_type[4]);
            this.writeD(this.player.playerConfig.keyboard.k_backwards);
            this.writeC(this.player.playerConfig.mouse.k_type[5]);
            this.writeD(this.player.playerConfig.keyboard.k_jump);
            this.writeC(this.player.playerConfig.mouse.k_type[6]);
            this.writeD(this.player.playerConfig.keyboard.k_walk);
            this.writeC(this.player.playerConfig.mouse.k_type[7]);
            this.writeD(this.player.playerConfig.keyboard.k_crouch);
            this.writeC(this.player.playerConfig.mouse.k_type[8]);
            this.writeD(this.player.playerConfig.keyboard.k_action);
            this.writeC(this.player.playerConfig.mouse.k_type[9]);
            this.writeD(this.player.playerConfig.keyboard.k_shoot);
            this.writeC(this.player.playerConfig.mouse.k_type[10]);
            this.writeD(this.player.playerConfig.keyboard.k_scope);
            this.writeC(this.player.playerConfig.mouse.k_type[11]);
            this.writeD(this.player.playerConfig.keyboard.k_reload);
            this.writeC(this.player.playerConfig.mouse.k_type[12]);
            this.writeD(this.player.playerConfig.keyboard.k_change_weapon);
            this.writeC(this.player.playerConfig.mouse.k_type[13]);
            this.writeD(this.player.playerConfig.keyboard.weapons1);
            this.writeC(this.player.playerConfig.mouse.k_type[14]);
            this.writeD(this.player.playerConfig.keyboard.weapons2);
            this.writeC(this.player.playerConfig.mouse.k_type[15]);
            this.writeD(this.player.playerConfig.keyboard.weapons3);
            this.writeC(this.player.playerConfig.mouse.k_type[16]);
            this.writeD(this.player.playerConfig.keyboard.weapons4);
            this.writeC(this.player.playerConfig.mouse.k_type[17]);
            this.writeD(this.player.playerConfig.keyboard.weapons5);
            this.writeC(this.player.playerConfig.mouse.k_type[18]);
            this.writeD(this.player.playerConfig.keyboard.weapons6);
            this.writeC(this.player.playerConfig.mouse.k_type[19]);
            this.writeD(this.player.playerConfig.keyboard.k_any_weapon);
            this.writeD(this.player.playerConfig.mouse.k_type[20]);
            this.writeC(this.player.playerConfig.keyboard.k_previous_weapon);
            this.writeD(this.player.playerConfig.mouse.k_type[21]);
            this.writeC(this.player.playerConfig.keyboard.k_next_weapon);
            this.writeC(this.player.playerConfig.mouse.k_type[22]);
            this.writeD(this.player.playerConfig.keyboard.k_player_weapon);
            this.writeC(this.player.playerConfig.mouse.k_type[23]);
            this.writeD(this.player.playerConfig.keyboard.k_scoreboard);
            this.writeC(this.player.playerConfig.mouse.k_type[24]);
            this.writeD(this.player.playerConfig.keyboard.k_map);
            this.writeC(this.player.playerConfig.mouse.k_type[25]);
            this.writeD(this.player.playerConfig.keyboard.k_map_up);
            this.writeC(this.player.playerConfig.mouse.k_type[26]);
            this.writeD(this.player.playerConfig.keyboard.k_map_down);
            this.writeC(this.player.playerConfig.mouse.k_type[27]);
            this.writeD(this.player.playerConfig.keyboard.k_chat);
            this.writeC(this.player.playerConfig.mouse.k_type[28]);
            this.writeD(this.player.playerConfig.keyboard.k_chat_team);
            this.writeC(this.player.playerConfig.mouse.k_type[29]);
            this.writeD(this.player.playerConfig.keyboard.k_chat_all);
            this.writeC(this.player.playerConfig.mouse.k_type[30]);
            this.writeD(this.player.playerConfig.keyboard.k_chat_help);
            this.writeC(this.player.playerConfig.mouse.k_type[31]);
            this.writeD(this.player.playerConfig.keyboard.k_chat_question);
            this.writeC(this.player.playerConfig.mouse.k_type[32]);
            this.writeD(this.player.playerConfig.keyboard.k_radio_team);
            this.writeC(this.player.playerConfig.mouse.k_type[33]);
            this.writeD(this.player.playerConfig.keyboard.k_radio_personal);
            this.writeC(this.player.playerConfig.mouse.k_type[34]);
            this.writeD(this.player.playerConfig.keyboard.k_radio_global);
            this.writeC(this.player.playerConfig.mouse.k_type[35]);
            this.writeD(this.player.playerConfig.keyboard.k_bomb_defuse);
            this.writeC(this.player.playerConfig.mouse.k_type[36]);
            this.writeD(this.player.playerConfig.keyboard.k_sensitivity_up);
            this.writeC(this.player.playerConfig.mouse.k_type[37]);
            this.writeD(this.player.playerConfig.keyboard.k_sensitivity_down);
            this.writeC(this.player.playerConfig.mouse.k_type[38]);
            this.writeD(this.player.playerConfig.keyboard.k_print);
            this.writeC(this.player.playerConfig.mouse.k_type[39]);
            this.writeD(this.player.playerConfig.keyboard.k_chat_command);
            this.writeC(this.player.playerConfig.mouse.k_type[40]);
            this.writeD(this.player.playerConfig.keyboard.k_aim_x);
            this.writeC(this.player.playerConfig.mouse.k_type[41]);
            this.writeD(this.player.playerConfig.keyboard.k_record);
            this.writeC(this.player.playerConfig.mouse.k_type[42]);
            this.writeD(this.player.playerConfig.keyboard.k_max_value);
            this.writeD(this.player.playerConfig.mouse.k_type[43]);
            this.writeD(this.player.playerConfig.keyboard.k_macro_execute);
            this.writeC(this.player.playerConfig.keyboard.macro1.length + 1);
            this.writeT(
                this.player.playerConfig.keyboard.macro1,
                this.player.playerConfig.keyboard.macro1.length + 1
            );
            this.writeC(this.player.playerConfig.keyboard.macro2.length + 1);
            this.writeT(
                this.player.playerConfig.keyboard.macro2,
                this.player.playerConfig.keyboard.macro2.length + 1
            );
            this.writeC(this.player.playerConfig.keyboard.macro3.length + 1);
            this.writeT(
                this.player.playerConfig.keyboard.macro3,
                this.player.playerConfig.keyboard.macro3.length + 1
            );
            this.writeC(this.player.playerConfig.keyboard.macro4.length + 1);
            this.writeT(
                this.player.playerConfig.keyboard.macro4,
                this.player.playerConfig.keyboard.macro4.length + 1
            );
            this.writeC(this.player.playerConfig.keyboard.macro5.length + 1);
            this.writeT(
                this.player.playerConfig.keyboard.macro5,
                this.player.playerConfig.keyboard.macro5.length + 1
            );
        }
    }
}
