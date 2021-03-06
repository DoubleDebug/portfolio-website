import {
  Container,
  useColorModeValue,
  Heading,
  Flex,
  Link,
  Text,
  Grid,
  useMediaQuery,
} from '@chakra-ui/react';
import ProjectPreview from '../projects/projectPreview';

interface IHomepageProjectsSectionProps {
  projects: Project[];
}

const HomepageProjectsSection: React.FC<IHomepageProjectsSectionProps> = ({
  projects,
}) => {
  const [isScreenBigEnough] = useMediaQuery('(min-width: 400px)');

  return (
    <Container
      id="homepage-section-projects"
      display="grid"
      justifyContent="center"
      maxW="100%"
      p="12"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Flex align="center" justify="space-between">
        <Heading as="h1" size="2xl" textAlign={{ base: 'center', lg: 'left' }}>
          Projects
        </Heading>
        {isScreenBigEnough && (
          <Flex columnGap={4} alignItems="center">
            <Text fontSize={{ base: 'xs', sm: 'initial' }} whiteSpace="nowrap">
              Showing 3 of {projects.length}
            </Text>
            <span>—</span>
            <Link
              href="/projects"
              fontSize={{ base: 'xs', sm: 'initial' }}
              whiteSpace="nowrap"
            >
              See all
            </Link>
          </Flex>
        )}
      </Flex>
      <Grid mt={{ base: 8, lg: 16 }}>
        {projects
          .filter((p) => p.showOnHomepage)
          .map((project) => (
            <ProjectPreview
              data={project}
              key={`project-preview-${project.id}`}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default HomepageProjectsSection;
