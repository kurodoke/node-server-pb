import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import { PlayerInstance } from './player';
import { MessageTypeEnum } from '../enum/MessageTypeEnum';
import { MessageClanEnum } from '../enum/MessageClanEnum';
import { ClanInstance } from './clan';

/**
 * base attribute of the model
 */
export interface MessageAttributes{
    object: number;
    clanId: number;
    playerId: number;
    senderId: number;
    text: string;
    type: MessageTypeEnum;
    state: boolean;
    response: number;
    receive: MessageClanEnum;
    expireDate: number;
    days: number;
    special: boolean;
    senderName: string;
};

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface MessageInstance extends Model<MessageAttributes>, MessageAttributes {
    getSender: BelongsToGetAssociationMixin<PlayerInstance>;
    addSender: BelongsToCreateAssociationMixin<PlayerInstance>;

    getPlayer: BelongsToGetAssociationMixin<PlayerInstance>;
    addPlayer: BelongsToCreateAssociationMixin<PlayerInstance>;
    
    getClan: BelongsToGetAssociationMixin<ClanInstance>;
    addClan: BelongsToCreateAssociationMixin<ClanInstance>;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type MessageModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): MessageInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function MessageModel(sequelize: Sequelize): MessageModelStatic{
    return <MessageModelStatic>sequelize.define<MessageInstance>("message",{
        object:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        }, 
        clanId:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        playerId:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        senderId:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        senderName:{
            type:DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
        },
        text:{
            type:DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
        },
        type:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        state:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        days:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 15,
        },
        response:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        receive:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        expireDate:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        special:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });
}

/**
 * this is an object from each instance of (player used)equipment in database
 */
export class Message implements MessageAttributes {
    declare object: number;
    declare clanId: number;
    declare playerId: number;
    declare senderId: number;
    declare text: string;
    declare type: MessageTypeEnum;
    declare state: boolean;
    declare response: number;
    declare receive: MessageClanEnum;
    declare expireDate: number;
    declare days: number;
    declare special: boolean;
    declare senderName: string;

    constructor(message: MessageAttributes) {
        this.object = message.object;
        this.clanId = message.clanId;
        this.playerId = message.playerId;
        this.senderId = message.senderId;
        this.text = message.text;
        this.type = message.type;
        this.state = message.state;
        this.response = message.response;
        this.receive = message.receive;
        this.expireDate = message.expireDate;
        this.days = message.days;
        this.special = message.special;
        this.senderName = message.senderName;
    }
}