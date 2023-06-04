import { useRouter } from 'next/router'

export const useNavigate = () => {
  const router = useRouter()
  const navigate = (url: string | Record<string, string>) => router?.push(url)
  return {
    navigate
  }
}
