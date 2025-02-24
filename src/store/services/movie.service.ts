import axios from "axios";

export async function fetchMovieList(
  params: any
): Promise<ICreateUpdateResponse<null>> {
  try {
    const response = await axios.get(
      `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${params}`
    );
    return response.data.items;
  } catch (error: any) {
    return { isError: true, message: error?.message };
  }
}

export const fetchMovieDetail = async (payload: {
  slug: string;
}): Promise<{
  movie: Movie | null;
  episodes: Episode[] | null;
} | null> => {
  if (!payload.slug) return null;
  try {
    const response = await axios.get(`https://ophim1.com/phim/${payload.slug}`);
    return response.data;
  } catch (error: any) {
    return null;
  }
};

export const searchMovies = async (
  params: ISearchParams
): Promise<any | null> => {
  console.log("searchMovies", params);
  const keyword = params.keyword;
  if (!keyword) return null;
  try {
    const response = await axios.get(
      `https://ophim17.cc/_next/data/YjU3ELa3ICaBELMtMHUHj/tim-kiem.json?keyword=${keyword}`
    );
    return response.data.items;
  } catch (error: any) {
    return null;
  }
};
