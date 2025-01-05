export type AnimeResponse = {
    title: string;
    images: AnimeImages,
    synopsis: string,
    score: number,
    episodes: number;
    status: string;
    genres: Genre[];
    studios: Studio[];
    duration: number;
    rating: number;

}

type Genre = {
    name: string
}

type Studio = {
    name: string
}

type AnimeImages = {
    jpg: {
        image_url: string;
    }

}

export type AnimeCategory = {
    mal_id: number;
    title: string;
    rank: number;
    genres?: Genre[];
    synopsis?: string;
    url: string;
};

export type AnimeNewsImage = {
    jpg?: {
        image_url: string;
    };
};

export type AnimeNews = {
    title: string;
    synopsis: string;
    aired: { string: string };
    images?: AnimeNewsImage;
    url: string;
};
