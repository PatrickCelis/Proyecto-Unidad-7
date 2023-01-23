import type { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { verify_authentication } from "../authenticate";

const secret_key = process.env.SECRET_KEY || 'Alguna llave secreta';

const prisma = new PrismaClient();

export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {

    if(verify_authentication(req, secret_key)){

      const users = await prisma.user.findMany();

      res.status(200).json({
        ok: true,
        data: users,
      });
    } else {
      res.status(400).json({ok: false, message: 'failed authentication'});
    }

  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    data.last_session = data.last_session || null;
    data.update_at = data.update_at || null;

    const encrypted_password = await bcrypt.hash(data.password, 10);

    const new_user = {
      name: data.name,
      email: data.email,
      password: encrypted_password,
      last_session: data.last_session,
      update_at: data.update_at,
      date_born: new Date(data.date_born)
    }
    const user = await prisma.user.create({ data: new_user });

    const token = jwt.sign({id: user.id, email: user.email}, secret_key, {
      expiresIn: 86400
    });

    res.status(201).json({ ok: true, message: "Usuario creado correctamente", data: user, token: token });

  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: error });
  }
};

export const login = async (req:Request, res: Response): Promise<void> => {
  try{
    const { email, password } = req.body
    const user: User | null = await prisma.user.findUnique({ where: {email: email}})
    if (user == null){
      res.status(400).json({ok: false, message: "El correo electrónico es incorrecto"})
      // const is_valid = await bcrypt.compare(req.body.password, user.password)
    } else {
      const is_valid = await bcrypt.compare(password, user.password)

      if(is_valid){
        const token = jwt.sign({id: user.id, email: user.email}, secret_key, {
          expiresIn: 86400
        });

        res.status(201).json({ ok: true, message: "Login exitoso", data: user, token: token });

      } else {
        res.status(400).json({ok: false, message: "Contraseña incorrecta"})
      }
    }
  } catch (error){
    res.status(500).json({ ok: false, message: error });
  }
};