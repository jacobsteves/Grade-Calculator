// Copyright 2016-present 650 Industries. All rights reserved.

#import "EXScopedBridgeModule.h"
#import "EXScopedModuleRegistry.h"

@interface EXFileSystem : EXScopedBridgeModule

@property (nonatomic, readonly) NSString *documentDirectory;
@property (nonatomic, readonly) NSString *cachesDirectory;

+ (BOOL)ensureDirExistsWithPath:(NSString *)path;
+ (NSString *)documentDirectoryForExperienceId:(NSString *)experienceId;
+ (NSString *)cachesDirectoryForExperienceId:(NSString *)experienceId;

@end

EX_DECLARE_SCOPED_MODULE_GETTER(EXFileSystem, fileSystem)
