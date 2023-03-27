import { useLocalStorage } from 'usehooks-ts';

export const useGetUserIdHook = () => {
	const [userId, setUserId] = useLocalStorage<string | undefined>('userId', undefined);

	return { userId, setUserId };
};
