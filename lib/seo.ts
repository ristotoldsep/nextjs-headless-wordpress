import graphqlRequest from "./graphqlRequest";

export interface SeoSchema {
    raw: string;
}

export interface SeoOpengraphImage {
    mediaItemUrl: string;
}

export interface SeoData {
    opengraphImage: SeoOpengraphImage;
    opengraphModifiedTime: string;
    opengraphPublishedTime: string;
    opengraphTitle: string;
    opengraphType: string;
    opengraphUrl: string;
    schema: SeoSchema;
    title: string;
    metaDesc: string;
    opengraphSiteName: string;
    readingTime: string;
    opengraphPublisher: string;
}

interface GraphQLResponse<T> {
    data: T;
}

interface PageSeoResponse {
    [key: string]: {
        seo: SeoData;
    };
}

export async function getSeo(pageType: string = 'post', slug: string = '/'): Promise<SeoData> {
    const query = {
        query: `query getSeo {
            ${pageType}(id: "${slug}", idType: SLUG) {
              seo {
                opengraphImage {
                  mediaItemUrl
                }
                opengraphModifiedTime
                opengraphPublishedTime
                opengraphTitle
                opengraphType
                opengraphUrl
                schema {
                  raw
                }
                title
                metaDesc
                opengraphSiteName
                readingTime
                opengraphPublisher
              }
            }
          }`
    };

    const getSeo = await graphqlRequest<GraphQLResponse<PageSeoResponse>>(query);
    const seoData = getSeo.data[pageType].seo;

    console.log('seodata...');
    console.log(seoData.opengraphImage.mediaItemUrl);

    return seoData;
}
