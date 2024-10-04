import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createTransaction } from '../../functions/create-transaction'
import { db } from '../../db'


export const createTransactionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/transactions',
    {
      schema: {
        body: z.object({
          title: z.string(),
          description: z.string(),
          value: z.string(),
          installments: z.number(),
          endsAt: z.string(),
          type: z.enum(['outcome', 'income']),
        }),
      },
    },
    async request => {
      const { title, description, value, installments, endsAt, type} = request.body

      await createTransaction({
        title,
        description,
        value,
        installments,
        endsAt: new Date(endsAt),
        type,
      })
    }
  )
}
