import { userModel } from "../../models/user.model.js";

export default class UsersServiceDao {
  async getUserByEmail(email) {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      throw new Error(`Error while fetching user by email: ${error.message}`);
    }
  }

  async modifyUser(email, password) {
    try {
      // Buscar al usuario por su correo electrónico
      const user = await userModel.findOne({ email: email });

      if (!user) {
        throw new Error("User not found");
      }

      // Modificar la contraseña del usuario
      user.password = password;
      await user.save();

      return user; // Retorna el usuario modificado
    } catch (error) {
      throw new Error(`Error while modifying user: ${error.message}`);
    }
  }

  async updateUserFiles(_id, imgName, imgPath) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const userExists = await userModel.findById({ _id });

        if (userExists) {
          let result = await userModel.findByIdAndUpdate(
            { _id },
            {
              $push: {
                documents: {
                  name: imgName,
                  reference: imgPath,
                },
              },
            }
          );
          return result;
        }
        return "User not found";
      }
    } catch (error) {
      return error;
    }
  }

  async updateUserStatus(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const userExists = await userModel.findById({ _id });

        if (userExists) {
          await userModel.findByIdAndUpdate(
            { _id },
            { status: "docsUploaded" }
          );
        }
        return "User not found";
      }
    } catch (error) {
      return error;
    }
  }

  async getAllUsers() {
    try {
      const users = await userModel.find();

      return users;
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
