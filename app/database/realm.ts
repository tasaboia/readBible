import Realm from "realm";
import { biblePiecesSchema } from "./schemas/bibleSchema";

const getRealm = async () => {
  const app = new Realm.App({ id: "readbible-lfrxd" });
  const credentials =  Realm.Credentials.emailPassword("tainasaboia@gmail.com", "Mnt1991****");
  const User = await app.logIn(credentials);

  return await Realm.open({
    path: "BiblePlan",
    schema: [biblePiecesSchema],
    deleteRealmIfMigrationNeeded: true, 
  });
};

export default getRealm;