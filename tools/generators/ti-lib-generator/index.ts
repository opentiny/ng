import { Tree, formatFiles, generateFiles, joinPathFragments, updateJson } from '@nrwl/devkit';
import { TiLibGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: TiLibGeneratorSchema) {
  const importPath = `@opentiny/ng-${schema.name}`;
  const libraryRoot = `src/${schema.name}`;
  const camelName = transform2CamelCase(schema.name);
  const opentinyNgDir = 'src/ng';
  schema.i18n = schema.i18n?.toLocaleLowerCase();

  updateJson(tree, 'tsconfig.base.json', (json) => {
    const c = json.compilerOptions;
    if (c.paths[importPath]) {
      throw new Error(`You already have a library using the name "${schema.name}". Make sure to specify a unique one.`);
    }

    c.paths[importPath] = [joinPathFragments(libraryRoot, '/lib/index.ts')];

    return json;
  });

  updateJson(tree, 'angular.json', (json) => {
    json.projects[schema.name] = joinPathFragments(libraryRoot, '/lib');
    const demoProjectName = `${schema.name}-demo`;
    json.projects[demoProjectName] = joinPathFragments(libraryRoot, '/demo');

    return json;
  });

  updateJson(tree, joinPathFragments(opentinyNgDir, 'lib/package.json'), (json) => {
    json.peerDependencies[importPath] = schema.version;

    return json;
  });

  const file = tree.read(joinPathFragments(opentinyNgDir, 'lib/index.ts'), 'utf8');
  tree.write(
    joinPathFragments(opentinyNgDir, 'lib/index.ts'),
    `${file}
export * from '${importPath}';
  `
  );

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    libraryRoot, // destination path of the files
    {
      ...schema,
      tmpl: '',
      camelName,
      importPath,
      componentName: `Ti${camelName}Component`,
      moduleName: `Ti${camelName}Module`,
      demoComponentName: `${camelName}BasicComponent`,
      demoModuleName: `${camelName}TestModule`,
      i18nWords: `Ti${camelName}Words`,
      i18nWordsName: `ti${camelName}`
    } // config object to replace variable in file templates
  );

  if (schema.i18n === 'n') {
    tree.delete(joinPathFragments(libraryRoot, '/lib/src/i18n'));
  }

  await formatFiles(tree);
  return () => {};
}

function transform2CamelCase(str) {
  const arr = str.split('-');
  const result = arr.map((item) => {
    return `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`;
  });
  return result.join('');
}
