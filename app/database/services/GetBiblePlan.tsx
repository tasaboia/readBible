import getRealm from "../realm";
import { biblePieces } from "../schemas/type";

const GetAllBiblePlan= async () => {
  const realm = await getRealm();
  return realm
    .objects<biblePieces>("biblePieces")
    .sorted([
      ["day", false],
      ["month", false],
    ]);
};



export const ClearAll = async () => {
  const realm = await getRealm();
  realm.write(() => {
    // Delete all instances of Cat from the realm.
    realm.delete(realm.objects("biblePieces"));
  });
};


export default GetAllBiblePlan;

