'use client';

import {
  Award,
  BarChart2,
  Bell,
  ChevronDown,
  CreditCard,
  ExternalLink,
  FilePlus,
  FileText,
  Globe,
  HelpCircle,
  LayoutDashboard,
  LinkIcon,
  List,
  MessageSquare,
  Plus,
  Rss,
  Search,
  Settings,
  Shield,
  User,
  Zap,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

function SideBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { activeAccount, switchAccount } = useAppContext();

  const isActive = (path) =>
    pathname === path || pathname.startsWith(`${path}/`);
  const isArticlesActive =
    isActive('/articles') || pathname === '/create-article';

  return (
    <div className="w-64  bg-white h-screen flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AB</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">abun</h2>
        </div>
      </div>

      {/* Account Selector */}
      <div className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {(activeAccount || 'A').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-800 truncate max-w-[120px]">
                  {activeAccount}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[220px] p-1">
            <DropdownMenuItem
              onClick={() => switchAccount('amazon.com')}
              className="flex items-center gap-2 px-3 py-2 text-sm"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-rose-500 text-white">
                  A
                </AvatarFallback>
              </Avatar>
              <span>amazon.com</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => switchAccount('mystore.com')}
              className="flex items-center gap-2 px-3 py-2 text-sm"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-emerald-500 text-white">
                  M
                </AvatarFallback>
              </Avatar>
              <span>mystore.com</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => switchAccount('newproject.com')}
              className="flex items-center gap-2 px-3 py-2 text-sm"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-amber-500 text-white">
                  N
                </AvatarFallback>
              </Avatar>
              <span>newproject.com</span>
            </DropdownMenuItem>
            <div className="border-t mt-1 pt-1">
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600">
                <Plus className="h-4 w-4" />
                <span>Add Account</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-3">
          {/* Main Navigation */}
          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/') && 'bg-blue-50 text-blue-600'
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </Button>
          </Link>

          {/* Articles Section */}
          <div className="mb-1">
            <Link to="/articles">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-between gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                  isArticlesActive && 'bg-blue-50 text-blue-600'
                )}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">Articles</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform text-gray-400',
                    isArticlesActive && 'rotate-180 text-blue-600'
                  )}
                />
              </Button>
            </Link>

            {/* Articles Submenu */}
            {isArticlesActive && (
              <div className="ml-9 mt-1 grid gap-1">
                <Link to="/create-article">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'w-full justify-start gap-2 px-3 py-1.5 text-sm font-normal text-gray-600 hover:bg-gray-50',
                      pathname === '/create-article' &&
                        'text-blue-600 bg-blue-50'
                    )}
                  >
                    <FilePlus className="h-3.5 w-3.5" />
                    Create Article
                  </Button>
                </Link>
                <Link to="/articles/generated">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'w-full justify-start gap-2 px-3 py-1.5 text-sm font-normal text-gray-600 hover:bg-gray-50',
                      pathname.includes('/articles/generated') &&
                        'text-blue-600 bg-blue-50'
                    )}
                  >
                    <List className="h-3.5 w-3.5" />
                    Generated Articles
                  </Button>
                </Link>
                <Link to="/articles/keyword-projects">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'w-full justify-start gap-2 px-3 py-1.5 text-sm font-normal text-gray-600 hover:bg-gray-50',
                      pathname.includes('/articles/keyword-projects') &&
                        'text-blue-600 bg-blue-50'
                    )}
                  >
                    <Search className="h-3.5 w-3.5" />
                    Keyword Projects
                  </Button>
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link to="/articles/ai-keyword">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'w-full justify-start gap-2 px-3 py-1.5 text-sm font-normal text-gray-600 hover:bg-gray-50',
                      pathname.includes('/articles/ai-keyword') &&
                        'text-blue-600 bg-blue-50'
                    )}
                  >
                    <BarChart2 className="h-3.5 w-3.5" />
                    AI Keyword to Article
                  </Button>
                </Link>
                <Link to="/articles/steal-keyword">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'w-full justify-start gap-2 px-3 py-1.5 text-sm font-normal text-gray-600 hover:bg-gray-50',
                      pathname.includes('/articles/steal-keyword') &&
                        'text-blue-600 bg-blue-50'
                    )}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    Competitor Keyword
                  </Button>
                </Link>
                <Link to="/articles/import-keyword">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'w-full justify-start gap-2 px-3 py-1.5 text-sm font-normal text-gray-600 hover:bg-gray-50',
                      pathname.includes('/articles/import-keyword') &&
                        'text-blue-600 bg-blue-50'
                    )}
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Import from GSC
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Other Navigation Items */}
          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/auto-blog') && 'bg-blue-50 text-blue-600'
              )}
            >
              <Rss className="h-4 w-4" />
              <span className="font-medium">Auto Blog</span>
            </Button>
          </Link>

          <Link to="">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/internal-links') && 'bg-blue-50 text-blue-600'
              )}
            >
              <LinkIcon className="h-4 w-4" />
              <span className="font-medium">Internal Links</span>
            </Button>
          </Link>

          <Link to="">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/free-backlinks') && 'bg-blue-50 text-blue-600'
              )}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="font-medium">Backlinks</span>
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/integrations') && 'bg-blue-50 text-blue-600'
              )}
            >
              <Zap className="h-4 w-4" />
              <span className="font-medium">Integrations</span>
            </Button>
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-100 my-2"></div>

          {/* Secondary Navigation */}
          <Link to="/subscription">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/subscription') && 'bg-blue-50 text-blue-600'
              )}
            >
              <CreditCard className="h-4 w-4" />
              <span className="font-medium">Subscription</span>
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/affiliate') && 'bg-blue-50 text-blue-600'
              )}
            >
              <Award className="h-4 w-4" />
              <span className="font-medium">Affiliate</span>
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/updates') && 'bg-blue-50 text-blue-600'
              )}
            >
              <Bell className="h-4 w-4" />
              <span className="font-medium">Updates</span>
            </Button>
          </Link>

          <Link to="">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/help') && 'bg-blue-50 text-blue-600'
              )}
            >
              <HelpCircle className="h-4 w-4" />
              <span className="font-medium">Help Center</span>
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                isActive('/chat') && 'bg-blue-50 text-blue-600'
              )}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">Live Chat</span>
            </Button>
          </Link>

          {/* Bottom Navigation */}
          <div className="border-t border-gray-100 mt-2 pt-2">
            <Link to="/profile">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                  isActive('/profile') && 'bg-blue-50 text-blue-600'
                )}
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Profile</span>
              </Button>
            </Link>

            <Link to="/settings">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50',
                  isActive('/settings') && 'bg-blue-50 text-blue-600'
                )}
              >
                <Settings className="h-4 w-4" />
                <span className="font-medium">Settings</span>
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
