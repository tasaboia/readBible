import Realm from "realm";
import { dailyPlanSchema, dailyPlan_booksSchema } from "./schemas/dailyBible";

const getRealm = async () => {
  const app = new Realm.App({ id: "readbible-lfrxd" });
  const credentials =  Realm.Credentials.emailPassword("tainasaboia@gmail.com", "Mnt1991****");
  const User = await app.logIn(credentials);
  
  const realm = await Realm.open({
    path: "AnnualPlan",
    schema: [dailyPlanSchema, dailyPlan_booksSchema]
  });
   return realm
};

export default getRealm;