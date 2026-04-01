import { useState, useMemo } from "react";

interface FileTreeProps {
  onSelectFile: (url: string) => void;
  path: string
}

export function FileTree({ onSelectFile, path }: FileTreeProps) {
    const modules = import.meta.glob(`/assets/**/*`, { eager: true, as: 'url' });
    const allPaths = Object.values(modules) as string[];
    const paths = allPaths.filter(p => p.includes(`/assets/${path}/`));

    const [searchTerm, setSearchTerm] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const filteredPaths = useMemo(() => {
        if (!searchTerm) return paths;
        return paths.filter(path => 
            path.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, paths]);

    const buildTree = (paths: string[]) => {
        const root: any = {};
        paths.forEach((path) => {
            const parts = path.replace(/^\/|^\.\.\/assets\//, '').split('/');
            let current = root;

            parts.forEach((part, index) => {
                if (index < 3) return; 

                if (!current[part]) {
                    current[part] = index === parts.length - 1 ? path : {}; 
                }
                current = current[part];
            });
        });
        return root;
    };

    const treeData = useMemo(() => buildTree(filteredPaths), [filteredPaths]);

    const TreeNode = ({ name, node }: { name: string; node: any }) => {
        const isFile = typeof node === 'string';
        const decodedName = decodeURIComponent(name);

        const isOpenProps = searchTerm ? { open: true } : {};

        if (isFile) {
            return (
                <li>
                    <a 
                        href={node} 
                        onClick={(e) => {
                            e.preventDefault();
                            onSelectFile(node);
                        }}
                        className="py-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        {decodedName}
                    </a>
                </li>
            );
        }

        return (
            <li>
                <details {...isOpenProps}>
                    <summary className="py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        {decodedName}
                    </summary>
                    <ul>
                        {Object.keys(node).map((key) => (
                            <TreeNode key={key} name={key} node={node[key]} />
                        ))}
                    </ul>
                </details>
            </li>
        );
    };

    if (!isVisible) {
        return (
            <button 
                onClick={() => setIsVisible(true)}
                className="btn btn-sm btn-circle fixed left-2 top-2 z-50 bg-base-200 shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
        );
    }

    return (
       <section 
            id="file-tree" 
            className="menu rounded-box w-full md:w-1/3 lg:w-1/4 h-full p-2 bg-base-200 border-r border-base-300"
        >
            <div className="flex items-center justify-between gap-2 mb-2">
                <label className="input input-sm flex items-center gap-2 flex-grow">
                    <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                    <input 
                        type="search" 
                        placeholder="Hledat..." 
                        className="grow" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
                
                <button 
                    onClick={() => setIsVisible(false)}
                    className="btn btn-sm btn-ghost px-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
                <ul className="p-0">
                    <hr className="my-2 opacity-10" />
                    {Object.keys(treeData).length > 0 ? (
                        Object.keys(treeData).map((key) => (
                            <TreeNode key={key} name={key} node={treeData[key]} />
                        ))
                    ) : (
                        <li className="text-center opacity-50 mt-4">Nic nenalezeno</li>
                    )}
                </ul>
            </div>
        </section>
    );
}