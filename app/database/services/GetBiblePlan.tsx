import { useMainContext } from "../context";
import getRealm from "../realm";
import { dailyPlan } from "../schemas/type";


const GetAllDailyBible = async () => {
  const realm = getRealm();
  return (await realm)
     .objects<dailyPlan>("dailyPlan")
     .sorted([
       ["order", false],
     ]);
};

export const ClearAll = async () => {
  const realm = await getRealm();
  realm.write(() => {
    // Delete all instances of Cat from the realm.
    realm.delete(realm.objects("dailyPlan"));
  });
};


export default GetAllDailyBible;

