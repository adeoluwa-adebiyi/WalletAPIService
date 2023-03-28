import walletService from "../services/wallet-service-impl";

const getWallets = async(req: any, res:any) => {
    try{
        const userId = req.user.id;
        if(!userId){
            throw Error("user session does not exist");
        }
        const wallets = await walletService.getUserWallets(userId);
        res.json({
            data: wallets
        })
    }catch(e){
        res.status(500).json({
            error: "Failed to retrieve user wallets"
        })
    }
}

export default {
    getWallets
}