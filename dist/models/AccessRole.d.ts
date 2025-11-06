import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: string;
    description?: string | null | undefined;
    permissions?: {
        sidebar?: {
            dashboard?: boolean | null | undefined;
            inventory?: boolean | null | undefined;
            crm?: boolean | null | undefined;
            community?: boolean | null | undefined;
            customers?: boolean | null | undefined;
            dealer?: boolean | null | undefined;
            importcustomers?: boolean | null | undefined;
            matching?: boolean | null | undefined;
            subscriptionmanage?: boolean | null | undefined;
            ads?: boolean | null | undefined;
            hotproducts?: boolean | null | undefined;
            planbilling?: boolean | null | undefined;
        } | null | undefined;
        ads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        car?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        leads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
            assign?: boolean | null | undefined;
            remind?: boolean | null | undefined;
            email?: boolean | null | undefined;
        } | null | undefined;
        users?: {
            manage?: boolean | null | undefined;
        } | null | undefined;
        spares?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        subscription?: {
            view?: boolean | null | undefined;
            manage?: boolean | null | undefined;
        } | null | undefined;
        settings?: {
            update?: boolean | null | undefined;
        } | null | undefined;
        adminPanel?: {
            access?: boolean | null | undefined;
            viewUser?: boolean | null | undefined;
            deleteUser?: boolean | null | undefined;
            viewDealer?: boolean | null | undefined;
            deleteDealer?: boolean | null | undefined;
            viewStatistics?: boolean | null | undefined;
        } | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: string;
    description?: string | null | undefined;
    permissions?: {
        sidebar?: {
            dashboard?: boolean | null | undefined;
            inventory?: boolean | null | undefined;
            crm?: boolean | null | undefined;
            community?: boolean | null | undefined;
            customers?: boolean | null | undefined;
            dealer?: boolean | null | undefined;
            importcustomers?: boolean | null | undefined;
            matching?: boolean | null | undefined;
            subscriptionmanage?: boolean | null | undefined;
            ads?: boolean | null | undefined;
            hotproducts?: boolean | null | undefined;
            planbilling?: boolean | null | undefined;
        } | null | undefined;
        ads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        car?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        leads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
            assign?: boolean | null | undefined;
            remind?: boolean | null | undefined;
            email?: boolean | null | undefined;
        } | null | undefined;
        users?: {
            manage?: boolean | null | undefined;
        } | null | undefined;
        spares?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        subscription?: {
            view?: boolean | null | undefined;
            manage?: boolean | null | undefined;
        } | null | undefined;
        settings?: {
            update?: boolean | null | undefined;
        } | null | undefined;
        adminPanel?: {
            access?: boolean | null | undefined;
            viewUser?: boolean | null | undefined;
            deleteUser?: boolean | null | undefined;
            viewDealer?: boolean | null | undefined;
            deleteDealer?: boolean | null | undefined;
            viewStatistics?: boolean | null | undefined;
        } | null | undefined;
    } | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: string;
    description?: string | null | undefined;
    permissions?: {
        sidebar?: {
            dashboard?: boolean | null | undefined;
            inventory?: boolean | null | undefined;
            crm?: boolean | null | undefined;
            community?: boolean | null | undefined;
            customers?: boolean | null | undefined;
            dealer?: boolean | null | undefined;
            importcustomers?: boolean | null | undefined;
            matching?: boolean | null | undefined;
            subscriptionmanage?: boolean | null | undefined;
            ads?: boolean | null | undefined;
            hotproducts?: boolean | null | undefined;
            planbilling?: boolean | null | undefined;
        } | null | undefined;
        ads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        car?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        leads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
            assign?: boolean | null | undefined;
            remind?: boolean | null | undefined;
            email?: boolean | null | undefined;
        } | null | undefined;
        users?: {
            manage?: boolean | null | undefined;
        } | null | undefined;
        spares?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        subscription?: {
            view?: boolean | null | undefined;
            manage?: boolean | null | undefined;
        } | null | undefined;
        settings?: {
            update?: boolean | null | undefined;
        } | null | undefined;
        adminPanel?: {
            access?: boolean | null | undefined;
            viewUser?: boolean | null | undefined;
            deleteUser?: boolean | null | undefined;
            viewDealer?: boolean | null | undefined;
            deleteDealer?: boolean | null | undefined;
            viewStatistics?: boolean | null | undefined;
        } | null | undefined;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: string;
    description?: string | null | undefined;
    permissions?: {
        sidebar?: {
            dashboard?: boolean | null | undefined;
            inventory?: boolean | null | undefined;
            crm?: boolean | null | undefined;
            community?: boolean | null | undefined;
            customers?: boolean | null | undefined;
            dealer?: boolean | null | undefined;
            importcustomers?: boolean | null | undefined;
            matching?: boolean | null | undefined;
            subscriptionmanage?: boolean | null | undefined;
            ads?: boolean | null | undefined;
            hotproducts?: boolean | null | undefined;
            planbilling?: boolean | null | undefined;
        } | null | undefined;
        ads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        car?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        leads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
            assign?: boolean | null | undefined;
            remind?: boolean | null | undefined;
            email?: boolean | null | undefined;
        } | null | undefined;
        users?: {
            manage?: boolean | null | undefined;
        } | null | undefined;
        spares?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        subscription?: {
            view?: boolean | null | undefined;
            manage?: boolean | null | undefined;
        } | null | undefined;
        settings?: {
            update?: boolean | null | undefined;
        } | null | undefined;
        adminPanel?: {
            access?: boolean | null | undefined;
            viewUser?: boolean | null | undefined;
            deleteUser?: boolean | null | undefined;
            viewDealer?: boolean | null | undefined;
            deleteDealer?: boolean | null | undefined;
            viewStatistics?: boolean | null | undefined;
        } | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: string;
    description?: string | null | undefined;
    permissions?: {
        sidebar?: {
            dashboard?: boolean | null | undefined;
            inventory?: boolean | null | undefined;
            crm?: boolean | null | undefined;
            community?: boolean | null | undefined;
            customers?: boolean | null | undefined;
            dealer?: boolean | null | undefined;
            importcustomers?: boolean | null | undefined;
            matching?: boolean | null | undefined;
            subscriptionmanage?: boolean | null | undefined;
            ads?: boolean | null | undefined;
            hotproducts?: boolean | null | undefined;
            planbilling?: boolean | null | undefined;
        } | null | undefined;
        ads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        car?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        leads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
            assign?: boolean | null | undefined;
            remind?: boolean | null | undefined;
            email?: boolean | null | undefined;
        } | null | undefined;
        users?: {
            manage?: boolean | null | undefined;
        } | null | undefined;
        spares?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        subscription?: {
            view?: boolean | null | undefined;
            manage?: boolean | null | undefined;
        } | null | undefined;
        settings?: {
            update?: boolean | null | undefined;
        } | null | undefined;
        adminPanel?: {
            access?: boolean | null | undefined;
            viewUser?: boolean | null | undefined;
            deleteUser?: boolean | null | undefined;
            viewDealer?: boolean | null | undefined;
            deleteDealer?: boolean | null | undefined;
            viewStatistics?: boolean | null | undefined;
        } | null | undefined;
    } | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roleId: string;
    description?: string | null | undefined;
    permissions?: {
        sidebar?: {
            dashboard?: boolean | null | undefined;
            inventory?: boolean | null | undefined;
            crm?: boolean | null | undefined;
            community?: boolean | null | undefined;
            customers?: boolean | null | undefined;
            dealer?: boolean | null | undefined;
            importcustomers?: boolean | null | undefined;
            matching?: boolean | null | undefined;
            subscriptionmanage?: boolean | null | undefined;
            ads?: boolean | null | undefined;
            hotproducts?: boolean | null | undefined;
            planbilling?: boolean | null | undefined;
        } | null | undefined;
        ads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        car?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        leads?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
            assign?: boolean | null | undefined;
            remind?: boolean | null | undefined;
            email?: boolean | null | undefined;
        } | null | undefined;
        users?: {
            manage?: boolean | null | undefined;
        } | null | undefined;
        spares?: {
            view?: boolean | null | undefined;
            create?: boolean | null | undefined;
            edit?: boolean | null | undefined;
            delete?: boolean | null | undefined;
        } | null | undefined;
        subscription?: {
            view?: boolean | null | undefined;
            manage?: boolean | null | undefined;
        } | null | undefined;
        settings?: {
            update?: boolean | null | undefined;
        } | null | undefined;
        adminPanel?: {
            access?: boolean | null | undefined;
            viewUser?: boolean | null | undefined;
            deleteUser?: boolean | null | undefined;
            viewDealer?: boolean | null | undefined;
            deleteDealer?: boolean | null | undefined;
            viewStatistics?: boolean | null | undefined;
        } | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
