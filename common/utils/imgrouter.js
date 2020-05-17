 // function pregReplaceImg($content,$prefix)
 //        {
 //            $contentAlter = preg_replace_callback('/(<[img|IMG].*?src=[\'\"])([\s\S]*?)([\'\"])[\s\S]*?/i', function($match)use($prefix){
 //                if(strstr($match[2], 'http://') == false && strstr($match[1], 'https://') == false)
 //                    return $match[1].$prefix.$match[2].$match[3];
 //                else
 //                    return $match[1].$match[2].$match[3];
 //            } , $content);
 //            return $contentAlter;
 //        }
