import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import fs from 'fs/promises';
import { fetchProject } from '../../utils/fetching/fetchProject';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { BlogTags } from '../../components/blog/BlogTags';
import { Carousel } from '../../components/projects/Carousel';
import { Markdown } from '../../components/blog/Markdown';

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'public/data/projects.json');
  const projectIdsRaw = await fs.readFile(filePath);
  const projectIds = JSON.parse(projectIdsRaw.toString());

  const paths = projectIds.projects.map((p: any) => ({ params: { id: p.id } }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const projectData = await fetchProject(context.params?.id as string);

  return {
    props: projectData,
  };
};

interface IProjectArticleProps {
  content: string;
  metadata: Project;
}

const ProjectArticle: React.FC<IProjectArticleProps> = ({
  content,
  metadata,
}) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <Head>
        <title>Project "{metadata.title}" | Double Debug</title>
        <meta name="description" content="Web developer portfolio website" />
      </Head>
      <Container maxW={'7xl'} p={12} pt={8}>
        {!isMobile && (
          <Breadcrumb
            fontWeight="medium"
            fontSize="lg"
            color={useColorModeValue('gray.800', 'gray.400')}
            mb={4}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/projects/${metadata.id}`}>
                {metadata.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
        <Heading as="h1" size="3xl" mb={4}>
          {metadata.title}
        </Heading>
        <Flex
          justify="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
          mb={6}
        >
          <BlogTags tags={metadata.technologies} />
          <Flex
            alignItems={{ base: undefined, md: 'center' }}
            columnGap={4}
            flexDirection={{ base: 'column', md: 'row' }}
            rowGap={2}
            mt={{ base: 8, md: 0 }}
            w={{ base: 'full', md: 'min-content' }}
          >
            {metadata.urls.liveDemo && (
              <Button
                variant="outline"
                px={6}
                columnGap={2}
                onClick={() => window.open(metadata.urls.liveDemo)}
              >
                Live demo <ExternalLinkIcon />
              </Button>
            )}
            {!metadata.urls.isPrivate && (
              <Button
                variant="outline"
                px={6}
                columnGap={2}
                onClick={() => window.open(metadata.urls.githubRepo)}
              >
                Source code
                <FontAwesomeIcon icon={faGithub} />
              </Button>
            )}
          </Flex>
        </Flex>
        <Carousel images={metadata.urls.previewImages} />
        <Box rounded="3xl" py={8}>
          <Markdown content={content} />
        </Box>
      </Container>
    </>
  );
};

export default ProjectArticle;
