import { createHash } from 'crypto'

export const computeUsersHash = (usernames: number[]): string => {
	const sorted = [...usernames].sort()
	const data = sorted.join(',')
	return createHash('sha256').update(data).digest('hex')
}
